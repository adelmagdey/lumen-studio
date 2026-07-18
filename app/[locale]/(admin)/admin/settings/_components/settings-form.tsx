"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSetting } from "../../_actions/settings";

interface Setting {
  key: string;
  value: string;
}

const defaults: Setting[] = [
  { key: "siteName", value: "Lumen" },
  { key: "siteDescription", value: "A next-gen digital studio." },
  { key: "contactEmail", value: "hello@lumen.studio" },
  { key: "socialTwitter", value: "https://twitter.com/lumen" },
  { key: "socialLinkedIn", value: "https://linkedin.com/company/lumen" },
  { key: "socialGitHub", value: "https://github.com/lumen" },
];

export function SettingsForm({ initial }: { initial: Setting[] }) {
  const t = useTranslations("admin");
  const router = useRouter();
  const [items, setItems] = useState<Setting[]>(() => {
    const map = new Map(initial.map((s) => [s.key, s.value]));
    return defaults.map((d) => ({ key: d.key, value: map.get(d.key) ?? d.value }));
  });
  const [saving, setSaving] = useState(false);

  const update = (key: string, value: string) => {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, value } : i)));
  };

  const save = async () => {
    setSaving(true);
    try {
      for (const item of items) {
        await updateSetting(item);
      }
      toast.success(t("updateSuccess"));
      router.refresh();
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.key}>
            <Label htmlFor={item.key} className="font-mono text-xs">
              {item.key}
            </Label>
            <Input
              id={item.key}
              value={item.value}
              onChange={(e) => update(item.key, e.target.value)}
              className="mt-1.5"
            />
          </div>
        ))}
      </div>
      <Button onClick={save} disabled={saving} variant="gradient">
        <Save className="h-4 w-4" />
        {saving ? "…" : t("save")}
      </Button>
    </div>
  );
}
