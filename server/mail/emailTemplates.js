export const verifyEmailTemplate = (link) => `
<h2>Verify your email</h2>
<p>Click the link below to verify your email. This link expires in 15 minutes.</p>
<a href="${link}">Verify Email</a>
`;

export const resetPasswordTemplate = (link) => `
<h2>Reset your password</h2>
<p>This link expires in 15 minutes.</p>
<a href="${link}">Reset Password</a>
`;
