import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.post("/api/send-message", async (c) => {
    try {
        const { name, email, projectType, details } = await c.req.json();

        // Validation
        if (!name || !email || !projectType || !details) {
            return c.json(
                { success: false, message: "All fields are required." },
                400
            );
        }

        const emailjsRes = await fetch(
            "https://api.emailjs.com/api/v1.0/email/send",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    service_id: 'service_i5avnv7',
                    template_id: 'template_k9y7qlb',
                    user_id: 'GHmP4gvH45Zg_4jJU',
                    accessToken: 'SSXPsgHYYeurZUXxCqmGA', // required for backend
                    template_params: {
                        name: name,
                        email: email,
                        projectType: projectType,
                        details: details,
                    },
                }),
            }
        );

        if (!emailjsRes.ok) {
            const errorText = await emailjsRes.text();
            console.error("EmailJS error:", errorText);

            return c.json(
                { success: false, message: "Unfortunatly Failed to send email." , error: errorText},
                500
            );
        }

        return c.json({
            success: true,
            message: "Message sent successfully!",
        });

    } catch (err) {
        console.error("Server error:", err);

        return c.json(
            { success: false, message: "Server error." },
            500
        );
    }
});


export default app;
