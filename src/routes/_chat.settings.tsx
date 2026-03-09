import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export const Route = createFileRoute("/_chat/settings")({
  component: SettingsSheet,
});

function SettingsSheet() {
  const router = useRouter();

  const handleClose = () => {
    router.history.back();
  };

  return (
    <Sheet defaultOpen onOpenChange={(open) => !open && handleClose()}>
      <SheetContent className="w-96 overflow-y-auto p-4" side="right">
        <h2 className={"text-2xl"}>Settings</h2>

        <div className="mt-4 space-y-4">
          <section>
            <h3 className="mb-3 font-semibold text-sm">Preferences</h3>
            <Separator />
            <p className="mt-3 text-muted-foreground text-xs">
              Preferences will be configured in Task 11.
            </p>
          </section>

          <section>
            <h3 className="mb-3 font-semibold text-sm">Keybindings</h3>
            <Separator />
            <p className="mt-3 text-muted-foreground text-xs">
              Keybindings will be configured in Task 11.
            </p>
          </section>

          <section>
            <h3 className="mb-3 font-semibold text-sm">AI Model</h3>
            <Separator />
            <p className="mt-3 text-muted-foreground text-xs">
              Model selection will be configured in Task 06.
            </p>
          </section>
        </div>

        <div className="mt-8">
          <Button className="w-full" onClick={handleClose} variant="outline">
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
