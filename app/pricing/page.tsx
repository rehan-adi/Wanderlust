import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 mt-12 py-16">
      <div className="text-center md:mb-16 mb-8">
        <h1 className="md:text-6xl text-5xl font-bold mb-4">Memberships</h1>
        <p className="text-muted-foreground font-medium">
          Choose a plan that works for you 🚀
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {/* Starter Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-3">Free plan</CardTitle>
            <CardDescription className="flex flex-col">
              <span className="text-black text-base font-semibold mb-2">
                <ShieldCheck size={17} className="inline-block mr-1.5" />
                30 lakh Tokens access.
              </span>
              <span className="text-black text-base font-semibold mb-2">
                <ShieldCheck size={17} className="inline-block mr-1.5" />
                100 Image Credits access.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₹Free
              <span className="text-base font-semibold">/individual</span>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard" className="w-full">
              <Button
                className="bg-[#0f172a] w-full text-white text-base font-semibold hover:bg-[#1e293b"
                variant="default"
                size="lg"
              >
                Use for free
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="relative">
          <Badge
            className="absolute -top-2 -right-3 text-sm py-1"
            variant="default"
          >
            Most Popular
          </Badge>
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-2">Pro plan</CardTitle>
            <CardDescription className="flex flex-col">
              <span className="text-black text-base font-semibold mb-2">
                <ShieldCheck size={17} className="inline-block mr-1.5" />
                Unlimitted Tokens access.
              </span>
              <span className="text-black text-base font-semibold mb-2">
                <ShieldCheck size={17} className="inline-block mr-1.5" />
                Unlimitted Image Credits acccess.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₹111
              <span className="text-base font-semibold">/individual</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-[#0f172a] w-full text-white text-base font-semibold hover:bg-[#1e293b"
              variant="default"
              size="lg"
            >
              Get started
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Related Questions */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl underline decoration-dashed decoration-1 underline-offset-8 w-64 font-semibold mb-8 tracking-tight">
          Related Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card text-card-foreground p-6">
            <h3 className="text-lg font-semibold mb-2">
              How does the plan limit work?
            </h3>
            <p className="text-muted-foreground font-medium">
              If you go over your limit we'll nicely ask you to upgrade. You can
              create up to 100 images per month for free.
            </p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground p-6">
            <h3 className="text-lg font-semibold mb-2">
              Is there a refund policy if I cancel the Pro Plan?
            </h3>
            <p className="text-muted-foreground font-medium">
              No, there is no refund policy if you cancel the Pro Plan. You can
              cancel the plan anytime.
            </p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground p-6">
            <h3 className="text-lg font-semibold mb-2">
              What happens after the free plan trial ends?
            </h3>
            <p className="text-muted-foreground font-medium">
              The Free Plan is always available, but upgrading to Pro gives you
              unlimited access to all features.
            </p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground p-6">
            <h3 className="text-lg font-semibold mb-2">
              Do I need a credit card to start the Free Plan?
            </h3>
            <p className="text-muted-foreground font-medium">
              No, the Free Plan does not require any payment information to get
              started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
