import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

import { signOutOfPilot } from "../actions";

export function SignOutButton() {
  return (
    <form action={signOutOfPilot}>
      <Button size="sm" type="submit" variant="outline">
        <LogOut className="size-4" />
        خروج
      </Button>
    </form>
  );
}
