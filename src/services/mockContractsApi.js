// Get contract by id with 3s delay

const mockContracts = [
  {
    id: "c1",
    name: "MSA 2025",
    parties: "Microsoft & ABC Corp",
    expiry: "2025-12-31",
    status: "Active",
    risk: "Medium",
  },
  {
    id: "c2",
    name: "Network Services Agreement",
    parties: "TelNet & ABC Corp",
    expiry: "2025-10-10",
    status: "Renewal Due",
    risk: "High",
  },
  {
    id: "c3",
    name: "Cloud Hosting Agreement",
    parties: "AWS & ABC Corp",
    expiry: "2026-03-15",
    status: "Active",
    risk: "Low",
  },
  {
    id: "c4",
    name: "Software License",
    parties: "Adobe & ABC Corp",
    expiry: "2025-11-20",
    status: "Expired",
    risk: "Medium",
  },
  {
    id: "c5",
    name: "Support SLA",
    parties: "Dell & ABC Corp",
    expiry: "2026-01-05",
    status: "Active",
    risk: "Low",
  },
  {
    id: "c6",
    name: "Consulting Agreement",
    parties: "Accenture & ABC Corp",
    expiry: "2025-09-30",
    status: "Active",
    risk: "Medium",
  },
  {
    id: "c7",
    name: "Data Processing Addendum",
    parties: "Google & ABC Corp",
    expiry: "2026-02-28",
    status: "Active",
    risk: "Low",
  },
  {
    id: "c8",
    name: "Maintenance Contract",
    parties: "HP & ABC Corp",
    expiry: "2025-12-01",
    status: "Renewal Due",
    risk: "High",
  },
  {
    id: "c9",
    name: "Outsourcing Agreement",
    parties: "Infosys & ABC Corp",
    expiry: "2026-04-10",
    status: "Active",
    risk: "Medium",
  },
  {
    id: "c10",
    name: "Partnership Agreement",
    parties: "IBM & ABC Corp",
    expiry: "2025-10-25",
    status: "Expired",
    risk: "High",
  },
  {
    id: "c11",
    name: "Service Level Agreement",
    parties: "Cisco & ABC Corp",
    expiry: "2026-05-15",
    status: "Active",
    risk: "Low",
  },
  {
    id: "c12",
    name: "Non-Disclosure Agreement",
    parties: "Oracle & ABC Corp",
    expiry: "2025-11-30",
    status: "Active",
    risk: "Low",
  },
  {
    id: "c13",
    name: "Vendor Agreement",
    parties: "SAP & ABC Corp",
    expiry: "2026-03-20",
    status: "Active",
    risk: "Medium",
  },
  {
    id: "c14",
    name: "Distribution Agreement",
    parties: "Sony & ABC Corp",
    expiry: "2025-12-15",
    status: "Renewal Due",
    risk: "High",
  },
  {
    id: "c15",
    name: "Lease Agreement",
    parties: "WeWork & ABC Corp",
    expiry: "2026-01-30",
    status: "Active",
    risk: "Low",
  },
  {
    id: "c16",
    name: "Employment Contract",
    parties: "ABC Corp & John Doe",
    expiry: "2025-09-15",
    status: "Expired",
    risk: "Medium",
  },
  {
    id: "c17",
    name: "Freelance Agreement",
    parties: "ABC Corp & Jane Smith",
    expiry: "2025-10-05",
    status: "Active",
    risk: "Low",
  },
  {
    id: "c18",
    name: "Research Collaboration",
    parties: "MIT & ABC Corp",
    expiry: "2026-02-10",
    status: "Active",
    risk: "Medium",
  },
  {
    id: "c19",
    name: "Marketing Agreement",
    parties: "Ogilvy & ABC Corp",
    expiry: "2025-12-20",
    status: "Renewal Due",
    risk: "High",
  },
  {
    id: "c20",
    name: "Training Services",
    parties: "Coursera & ABC Corp",
    expiry: "2026-03-01",
    status: "Active",
    risk: "Low",
  },
];

export function fetchContracts({
  page = 0,
  pageSize = 10,
  search = "",
  status = "",
  risk = "",
  sortBy = "",
  sortDir = "asc",
} = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = mockContracts;
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.name.toLowerCase().includes(s) ||
            c.parties.toLowerCase().includes(s)
        );
      }
      if (status) filtered = filtered.filter((c) => c.status === status);
      if (risk) filtered = filtered.filter((c) => c.risk === risk);
      if (sortBy) {
        filtered = filtered.sort((a, b) => {
          if (a[sortBy] < b[sortBy]) return sortDir === "asc" ? -1 : 1;
          if (a[sortBy] > b[sortBy]) return sortDir === "asc" ? 1 : -1;
          return 0;
        });
      }
      const total = filtered.length;
      const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);
      resolve({ data: paged, total });
    }, 5000); // 5s delay
  });
}

export function fetchContractById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const contract = {
        id: "c1",
        name: "MSA 2025",
        parties: "Microsoft & ABC Corp",
        start: "2023-01-01",
        expiry: "2025-12-31",
        status: "Active",
        risk: "Medium",
        clauses: [
          {
            title: "Termination",
            summary: "90 days notice period.",
            confidence: 0.82,
          },
          {
            title: "Liability Cap",
            summary: "12 months’ fees limit.",
            confidence: 0.87,
          },
        ],
        insights: [
          {
            risk: "High",
            message: "Liability cap excludes data breach costs.",
          },
          {
            risk: "Medium",
            message:
              "Renewal auto-renews unless cancelled 60 days before expiry.",
          },
        ],
        evidence: [
          {
            source: "Section 12.2",
            snippet: "Total liability limited to 12 months’ fees.",
            relevance: 0.91,
          },
        ],
      };
      resolve(contract || null);
    }, 3000);
  });
}
