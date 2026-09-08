export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface KnowledgeCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  articleCount: number;
}

export interface SupportTicketForm {
  name: string;
  email: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Emergency";
  subject: string;
  message: string;
}
