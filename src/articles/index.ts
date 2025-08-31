// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.

export interface Article {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  author: string;
  tags: string[];
  language: 'en' | 'uk';
  canonicalUrl?: string;
  robots?: string;
  schema?: string;
  content: string;
}

const _articles: Article[] = [
  {
    "slug": "welcome-to-svitlogics",
    "title": "One Person, One Project, One Month: Building Svitlogics from Kyiv",
    "description": "The story behind Svitlogics: an independent AI tool for disinformation analysis, engineered in Kyiv, Ukraine as a response to systemic information warfare.",
    "createdAt": "2025-08-14T00:00:00.000Z",
    "updatedAt": "2025-08-16T00:00:00.000Z",
    "author": "Eugene Kozlovsky",
    "tags": [
      "Project Update",
      "Introduction"
    ],
    "language": "en",
    "content": "My name is Eugene Kozlovsky. Svitlogics is not just an application; it is my answer to a problem I live with every day.\n\nFor a long time, I felt a passive anger towards the manipulation I saw everywhere — in the news, on social media, in professional discourse. This feeling crystallized into action after I saw a viral post that used the tragedy of war to justify poor service. People saw patriotism; I saw a masterclass in emotional exploitation.\n\nIt was no longer enough to simply see the manipulation. I had to build a tool to help others see it too.\n\n## The Mission: Clarity in Chaos\n\nThe mission of Svitlogics is direct: to provide an accessible, transparent instrument for identifying manipulative techniques. It was developed as a solo project from my home in Kyiv, Ukraine, born from the daily reality of information warfare.\n\nThis tool is not a \"truth machine.\" It does not deliver a simple \"true\" or \"false\" verdict. Effective manipulation rarely relies on a single, verifiable lie. Instead, it uses a complex web of emotional appeals, logical fallacies, and carefully framed narratives.\n\n## How It Works\n\nSvitlogics is designed as an auxiliary instrument for your own critical thinking. By leveraging a cascade of advanced AI models, it deconstructs text and provides a structured report across five core criteria:\n\n- Manipulative Content\n- Propagandistic Content\n- Disinformation\n- Unbiased Presentation\n- Emotional Tone\n\nMy core principle is that understanding _how_ a message is constructed to influence you is the first and most critical step toward resisting it.\n\nThis blog will serve as a platform to explore these topics further, share insights on new techniques of manipulation, and document the continued development of Svitlogics.\n\nThank you for joining me on this journey."
  }
];

export function getArticles(): Article[] {
  return _articles;
}
