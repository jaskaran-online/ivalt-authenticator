import speakeasy from "speakeasy";


export async function POST(req, res) {

    const { secret, token } = await req.json();

    // Here, we have to implement 2 strategies
    // 1. Verifying during LOGIN
    // 2. Enabling 2FA for the first time

    // Assuming the secret is already decrypted for simplicity
    const verified = speakeasy.totp.verify({
        secret: secret, // Secret Key
        encoding: "base32",
        token: token,   // OTP Code
    });

    return Response.json({ verified });

}
