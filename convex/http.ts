import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

const http = httpRouter();


//! 1- we need to make sure the webhook event is coming from clerk
//! 2- if so, we will listen for the user.created event
//! 3- we will save the user to the database
http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.error("Missing CLERK_WEBHOOK_SECRET environment variable");
            return new Response("Internal Server Error", { status: 500 });
        }

        // Check headers
        const svix_id = request.headers.get("svix-id");
        const svix_signature = request.headers.get("svix-signature");
        const svix_timestamp = request.headers.get("svix-timestamp");

        if (!svix_id || !svix_signature || !svix_timestamp) {
            console.error("Missing Svix headers");
            return new Response("Error occurred -- no Svix headers", { status: 400 });
        }

        const payload = await request.json();
        const body = JSON.stringify(payload);

        const wh = new Webhook(webhookSecret);
        let evt: any;

        // Verify the webhook
        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-signature": svix_signature,
                "svix-timestamp": svix_timestamp,
            }) as any;
        } catch (error) {
            console.error("Webhook verification failed:", error);
            return new Response("Error occurred during verification", { status: 400 });
        }

        const eventType = evt?.type;

        if (eventType === "user.created") {
            const { id, email_addresses, first_name, last_name, image_url } = evt.data || {};

            if (!email_addresses?.length) {
                console.error("No email addresses found in event data");
                return new Response("Invalid data structure", { status: 400 });
            }

            const email = email_addresses[0].email_address;
            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try {
                await ctx.runMutation(api.users.createUser, {
                    email,
                    fullname: name,
                    image: image_url,
                    clerkId: id,
                    username: email.split("@")[0],
                });
            } catch (error) {
                console.error("Error creating user:", error);
                return new Response("Error creating user", { status: 500 });
            }
        } else {
            console.warn(`Unhandled event type: ${eventType}`);
        }

        // Return a success response if all checks pass
        return new Response("Webhook processed successfully", { status: 200 });
    }),
});

export default http;
