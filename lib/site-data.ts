import {
  Car,
  Droplets,
  Home,
  Scissors,
  Sparkles,
  Truck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: LucideIcon;
  image: string;
};

export const services: Service[] = [
  {
    id: "home-repair",
    name: "Home repair",
    description: "Plumbing, electrical and everyday fixes.",
    price: "From BDT 400",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=85&w=900",
  },
  {
    id: "cleaning",
    name: "Cleaning",
    description: "A fresh, comfortable space without the hassle.",
    price: "From BDT 800",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=85&w=900",
  },
  {
    id: "car-care",
    name: "Car care",
    description: "On-site washes, checks and quick repairs.",
    price: "From BDT 1,200",
    icon: Car,
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=85&w=900",
  },
  {
    id: "moving",
    name: "Moving help",
    description: "Thoughtful packing and dependable shifting.",
    price: "From BDT 2,500",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=900",
  },
  {
    id: "wellness",
    name: "Wellness",
    description: "Care and grooming brought to your door.",
    price: "From BDT 700",
    icon: Scissors,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=85&w=900",
  },
  {
    id: "garden",
    name: "Garden care",
    description: "Keep your outdoor spaces healthy and inviting.",
    price: "From BDT 600",
    icon: Home,
    image: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=85&w=900",
  },
];

export const serviceOptions = [
  { label: "Home repair", value: "home-repair", icon: Wrench },
  { label: "Cleaning", value: "cleaning", icon: Sparkles },
  { label: "Car care", value: "car-care", icon: Car },
  { label: "Moving help", value: "moving", icon: Truck },
  { label: "Wellness", value: "wellness", icon: Scissors },
  { label: "Garden care", value: "garden", icon: Home },
];

export const trustStats = [
  { value: "4.9/5", label: "average rating" },
  { value: "12k+", label: "services completed" },
  { value: "30 min", label: "average response" },
];

export const matchProviders = [
  { name: "Rahim Electronics", specialty: "Home repair specialist", rating: "4.8", distance: "2.3 km", match: "98% match", initials: "RE" },
  { name: "Dhanmondi Tech Services", specialty: "HVAC & electrical", rating: "4.6", distance: "1.1 km", match: "91% match", initials: "DT" },
  { name: "SmartCool Solutions", specialty: "Appliance specialist", rating: "4.9", distance: "4.5 km", match: "87% match", initials: "SC" },
];

export const workflowSteps = [
  { number: "01", icon: Droplets, title: "Tell us what you need", description: "Choose a service, share your location and pick a convenient time." },
  { number: "02", icon: Zap, title: "We find your best match", description: "Our matching engine weighs skill, proximity, availability and ratings." },
  { number: "03", icon: Sparkles, title: "Enjoy the easy part", description: "Track arrival in real time and pay after the job is complete." },
];
