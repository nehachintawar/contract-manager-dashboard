import { fetchContractById } from "@/services/mockContractsApi";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

export function Component() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContractById(id).then((data) => {
      setContract(data);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Loader size={48} strokeWidth={2} className="animate-spin" />
        <span style={{ marginTop: 16, fontSize: 18, color: "#555" }}>
          Loading, please wait...
        </span>
      </div>
    );
  if (!contract) return <div>No contract found.</div>;

  return (
    <div className="max-full mx-auto p-6 space-y-8">
      {/* Metadata Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{contract.name}</CardTitle>
          <CardDescription>Contract Metadata</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-semibold">Parties:</span> {contract.parties}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {contract.status}
          </div>
          <div>
            <span className="font-semibold">Start Date:</span> {contract.start}
          </div>
          <div>
            <span className="font-semibold">Expiry Date:</span>{" "}
            {contract.expiry}
          </div>
          <div>
            <span className="font-semibold">Risk Score:</span>{" "}
            <span
              className={`px-2 py-1 rounded text-white ${
                contract.risk === "High"
                  ? "bg-red-500"
                  : contract.risk === "Medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {contract.risk}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Clauses Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Clauses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contract.clauses.map((clause, idx) => (
            <Card key={idx} className="border-blue-100">
              <CardHeader>
                <CardTitle>{clause.title}</CardTitle>
                <CardDescription>
                  Confidence:{" "}
                  <span className="font-bold">
                    {(clause.confidence * 100).toFixed(0)}%
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>{clause.summary}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Insights Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
        <ul className="space-y-3">
          {contract.insights.map((insight, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span
                className={`px-2 py-1 rounded text-xs font-bold text-white ${
                  insight.risk === "High"
                    ? "bg-red-500"
                    : insight.risk === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {insight.risk}
              </span>
              <span className="text-gray-800">{insight.message}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Evidence Panel Trigger */}
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">View Evidence</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Evidence Panel</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-2">
              {contract.evidence.map((ev, idx) => (
                <Card key={idx} className="border-green-100">
                  <CardHeader>
                    <CardTitle>{ev.source}</CardTitle>
                    <CardDescription>
                      Relevance:{" "}
                      <span className="font-bold">
                        {(ev.relevance * 100).toFixed(0)}%
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>{ev.snippet}</CardContent>
                </Card>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

Component.displayName = "ContractDetails";
