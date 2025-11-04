import "./article.css";

import Link from "next/link";
import { articles } from "@/data/data";

export async function generateMetadata({ params }) {
  const { articleID } = await params;

  const article = articles.find((a) => a.id === articleID);

  const metadata = {
    title: article.title,
    description: article.abstract,
    openGraph: {
      title: article.title,
      description: article.abstract,
      url: `https://online-articles.vercel.app/${article.id}`,
      type: "article",
      authors: article.authors.join("; "),
      publishedTime: article.publishedDate,
    },
    other: {
      citation_title: article.title,
      citation_author: article.authors.join("; "),
      citation_publication_date: article.publishedDate,
      citation_journal_title: "Online Research Journal of Uzbekistan",
      citation_volume: article.volume,
      citation_issue: article.issue,
      citation_pdf_url: `https://online-articles.vercel.app${article.pdfURL}`,
      citation_keywords: article.keywords.join(", "),
      citation_abstract: article.abstract,
      citation_language: "uz",
      citation_public_url: `https://online-articles.vercel.app/${article.id}`,
    },
  };

  return metadata;
}

export default async function Article({ params }) {
  const { articleID } = await params;

  const article = articles.find((a) => a.id === articleID);

  if (!article) {
    return <p>Maqola topilmadi.</p>;
  }

  return (
    <div className="article-detail-page">
      <Link href="/">⬅ Orqaga</Link>

      <div className="article-detail-card">
        <h1>{article.title}</h1>
        <p>
          <strong>Muallif(lar):</strong> {article.authors.join(", ")}
        </p>
        <p>{article.abstract}</p>
        <p>
          <strong>Kalit so‘zlar:</strong> {article.keywords.join(", ")}
        </p>

        <a href={article.pdfURL} target="_blank" rel="noopener noreferrer">
          PDF-ni ochish
        </a>

        <h2>References:</h2>
        <ul>
          {article.references.map((ref, idx) => (
            <li key={idx}>{ref}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
