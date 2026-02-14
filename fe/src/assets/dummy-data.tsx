import { UploadIcon, VideoIcon, ZapIcon } from 'lucide-react';
import type { Project } from '../types';

export const featuresData = [
    {
        icon: <UploadIcon className="w-6 h-6" />,
        title: 'Product & Brand Discovery',
        desc: 'We understand your product, target audience, and brand goals to plan high-converting AI ad creatives.'
    },
    {
        icon: <ZapIcon className="w-6 h-6" />,
        title: 'AI Ad Creation',
        desc: 'We generate stunning ads using AI models, visuals, and copy designed to grab attention and build brand trust.'
    },
    {
        icon: <VideoIcon className="w-6 h-6" />,
        title: 'Launch & Optimization',
        desc: 'Your ads are delivered ready to launch, with continuous improvements for better reach and performance.'
    }
];

export const plansData = [
    {
        id: 'starter',
        name: 'Starter',
        price: '₹49',
        desc: 'Try AI video ads with a simple starter pack.',
        credits: 'Token-based',
        features: [
            'AI video ad generation',
            'Limited tokens',
            'Standard video quality',
            'No support'
        ]
    },
    {
        id: 'basic',
        name: 'Creator',
        price: '₹499',
        desc: 'Best for small businesses creating multiple AI video ads.',
        credits: 'Token-based',
        features: [
            'AI video ad generation',
            'More tokens',
            'HD video quality',
            'Faster generation'
        ]
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '₹999',
        desc: 'For serious creators and brands scaling with AI videos.',
        credits: 'Token-based',
        features: [
            'AI video ad generation',
            'High token limit',
            'Full HD / premium quality',
            'Priority video processing',
            'Email & chat support'
        ],
        popular: true
    }
];

export const faqData = [
    {
        question: 'What does your AI ads platform do?',
        answer: 'We create high-quality AI-generated ads using AI models to help small businesses brand and promote their products effectively.'
    },
    {
        question: 'Who is this best suited for?',
        answer: 'Our platform is built for small businesses, startups, and growing brands that want professional ads without high agency costs.'
    },
    {
        question: 'How long does it take to get my ads?',
        answer: 'Most AI ad creatives are delivered within 24–72 hours, depending on the package and requirements.'
    },
    {
        question: 'Can I request changes or revisions?',
        answer: 'Yes. Each plan includes revision rounds so your ads match your brand vision perfectly.'
    }
];

export const footerLinks = [
    {
        title: "Company",
        links: [
            { name: "Home", url: "#" },
            { name: "Services", url: "#" },
            { name: "Pricing", url: "#" },
            { name: "Contact", url: "#" }
        ]
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", url: "#" },
            { name: "Terms of Service", url: "#" }
        ]
    },
    {
        title: "Connect",
        links: [
            { name: "Twitter", url: "#" },
            { name: "LinkedIn", url: "#" },
            { name: "Instagram", url: "#" }
        ]
    }
];

export const dummyProjects: Project[] = [
    {
        id: '1',
        name: 'Summer Collection Ad',
        productName: 'Floral Dress',
        productDescription: 'A beautiful floral dress perfect for summer outings.',
        aspectRatio: '9:16',
        userPrompt: 'Create a vibrant ad showcasing the floral dress in a sunny outdoor setting.',
        targetLength: 15,
        generatedImage: '/ceo.png',
        generatedVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isGenereating: false,
        isPublished: true,
        createdAt: new Date(),
        uploadedImages: []
    },
    {
        id: '2',
        name: 'Tech Gadget Promo',
        productName: 'Smartwatch Pro',
        productDescription: 'The latest smartwatch with advanced health tracking features.',
        aspectRatio: '16:9',
        userPrompt: 'Design a sleek ad highlighting the smartwatch’s features in a modern urban environment.',
        targetLength: 30,
        generatedImage: 'https://share.google/HwKURZXPjM95g0JCA',
        generatedVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
        isGenereating: false,
        isPublished: false,
        createdAt: new Date(),
        uploadedImages: []
    },
    {
        id: '3',
        productName: 'Nike Running Shoe',
        productDescription: 'High-performance running shoe with advanced cushioning',
        userPrompt: 'Create an engaging ad for a premium running shoe',
        aspectRatio: '16:9',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPublished: true,
        isGenereating: false,
        generatedImage: 'https://share.google/HwKURZXPjM95g0JCA',
        generatedVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
        uploadedImages: [
            'https://via.placeholder.com/150?text=Product',
            'https://via.placeholder.com/150?text=Model'
        ]
    },
    {
        id: '4',
        productName: 'Apple Watch Ultra',
        productDescription: 'Premium smartwatch with fitness tracking',
        userPrompt: 'Create a modern tech ad for smartwatch',
        aspectRatio: '16:9',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPublished: false,
        isGenereating: true,
        generatedImage: 'https://via.placeholder.com/800x450?text=Apple+Watch',
        generatedVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
        uploadedImages: [
            'https://via.placeholder.com/150?text=Product',
            'https://via.placeholder.com/150?text=Model'
        ]
    }
];

