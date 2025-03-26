import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";

export async function idenifyUser() {
  try {
    const fingerprint = await getFingerprint();
    return fingerprint;
  } catch (error) {
    console.error("Failed to generate fingerprint:", error);
    return null;
  }
}
