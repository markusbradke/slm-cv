import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    role?: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Vocabulary {
    id: number;
    uuid: string;
    slug: string;
    name: string;
    description?: string;
    terms_count?: number;
    created_at: string;
    updated_at: string;
}

export interface Term {
    id: number;
    uuid: string;
    name: string;
    definition?: string;
    provenance?: string;
    provenance_uri?: string;
    discussion_url?: string;
    notes?: string;
    aliases?: string;
    vocabulary: Vocabulary;
    status: 'pending' | 'rejected' | 'accepted' | 'deprecated';
    created_at: string;
    updated_at: string;
}

export interface PaginatedTerms {
    current_page: number;
    data: Term[]; // Array of term objects
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
