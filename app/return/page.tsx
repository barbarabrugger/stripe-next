import { stripe } from "../../utils/stripe";

async function getSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId!);
  return session;
}

interface CheckoutReturnProps {
  searchParams: {
    session_id: string;
  };
}

export default async function CheckoutReturn({ searchParams }: CheckoutReturnProps) {
  const sessionId = searchParams.session_id;
  const session = await getSession(sessionId);

  if (session?.status === "open"){
    return <p>Payment did not work.</p>
  }

  if (session?.status === "complete"){
    return <p>Payment successful!</p>
  }
}
