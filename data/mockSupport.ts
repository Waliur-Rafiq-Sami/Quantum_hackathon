import { FAQItem, KnowledgeCategory } from "@/types/support";

export const SUPPORT_CATEGORIES: KnowledgeCategory[] = [
  {
    id: "booking",
    title: "Bookings & Schedules",
    description:
      "Learn how to schedule, reschedule, or manage your service requests.",
    icon: "Calendar",
    articleCount: 12,
  },
  {
    id: "billing",
    title: "Payments & Invoices",
    description:
      "Information regarding payment methods, refunds, and downloading bills.",
    icon: "CreditCard",
    articleCount: 8,
  },
  {
    id: "safety",
    title: "Safety & Verification",
    description:
      "How we screen service providers and safeguard your home security.",
    icon: "ShieldCheck",
    articleCount: 6,
  },
  {
    id: "account",
    title: "Account & Profile",
    description:
      "Manage password resets, location addresses, and notification preferences.",
    icon: "User",
    articleCount: 10,
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "Bookings & Schedules",
    question: "How do I cancel or reschedule a booked service?",
    answer:
      "Go to your Dashboard -> Service Requests or History section. Click 'View Details' on your active request and select 'Revoke' or 'Reschedule'. Cancellations made at least 2 hours before the schedule incur zero penalty.",
  },
  {
    id: "faq-2",
    category: "Bookings & Schedules",
    question: "What happens if a technician arrives late?",
    answer:
      "Technicians have a 15-minute buffer allowance. If they exceed this time, you will receive an automatic SMS update with live tracking details, or you can contact support directly via hotlines.",
  },
  {
    id: "faq-3",
    category: "Payments & Invoices",
    question: "Which payment methods are supported?",
    answer:
      "We support bKash Digital, Nagad, Credit/Debit Cards (VISA/Mastercard), and Cash on Delivery (COD) upon job completion.",
  },
  {
    id: "faq-4",
    category: "Payments & Invoices",
    question: "How can I download my service receipt or invoice?",
    answer:
      "Visit the Service Request History page (/dashboard/history), click 'View Details' on any completed job, and hit 'Download Invoice' to get a text summary or PDF statement.",
  },
  {
    id: "faq-5",
    category: "Safety & Verification",
    question: "Are service technicians background checked?",
    answer:
      "Yes, 100% of providers on our platform undergo national NID verification, police clearance checks, and hands-on skill evaluations before activation.",
  },
  {
    id: "faq-6",
    category: "Account & Settings",
    question: "How do I update my service address?",
    answer:
      "Navigate to Dashboard Settings -> Saved Addresses. You can pin new locations using GPS or manually type street details for faster future checkout.",
  },
];
