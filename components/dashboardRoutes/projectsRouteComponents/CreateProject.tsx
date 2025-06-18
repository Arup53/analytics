import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useState } from "react";

const CreateProject = ({ handleAddWebsite }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // you mentioned `loading` in `addwebsite`

  const addwebsite = async () => {
    if (project.trim() === "" || loading) return;

    setLoading(true);
    try {
      const res = await fetch("/api/postWebsites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_name: name,
          website_name: project,
          userId: session?.user.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to post");

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkDuplicateDomains = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent form reload
    setError("");
    console.log("clicked");
    try {
      const res = await fetch("/api/getAllWebsites");
      const websites = await res.json();

      const isDuplicate = websites.some(
        (item: any) => item.website_name === project
      );

      if (isDuplicate) {
        setError("This domain is added before");
      } else {
        const post = await addwebsite();

        const res = await fetch("/api/getAllWebsites");
        const data = await res.json();
        handleAddWebsite(data);
        setOpen(false); //
      }
    } catch (err) {
      console.error("Error checking domain:", err);
      setError("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form className="w-full">
        <div className="w-[100%] flex items-center justify-between ">
          <h3 className="text-white text-sm">Your Projects</h3>
          <DialogTrigger asChild>
            <Button className="text-sm">+ Create Project</Button>
          </DialogTrigger>
        </div>

        <DialogContent className="bg-[#1e1e1e] sm:max-w-[425px] border border-gray-700 text-[#7a7a7a]">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Add your project's domain name and save.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value.trim().toLowerCase())}
                className="border-gray-600"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="domain">Domain Name</Label>
              <Input
                id="domain"
                value={project}
                onChange={(e) =>
                  setProject(e.target.value.trim().toLowerCase())
                }
                className="border-gray-600"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              onClick={checkDuplicateDomains}
            >
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateProject;
