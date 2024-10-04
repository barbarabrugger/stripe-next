"use client";

import { createPortalSession } from "./portalAction";
import { supabase } from "@/utils/supabaseClient";
import toast from "react-hot-toast";

export default function PortalButton() {
  const handleClick = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw "Please log in to manage your billing.";
      }

      const { data: customer, error: fetchError } = await supabase
        .from("stripe_customers")
        .select("stripe_customer_id")
        .eq("user_id", user.id)
        .single();

      const { url } = await createPortalSession(customer?.stripe_customer_id);

      window.location.href = url;
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the portal session");
    }
  };
  return (
    <>
      <button className="btn btn-accent" onClick={handleClick}>
        Manage billing
      </button>
    </>
  );
}
