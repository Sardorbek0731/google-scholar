import "./article.css";

import Link from "next/link";
import { articles } from "@/data/data";

export async function generateMetadata({ params }) {
  const { articleID } = await params;

  const article = articles.find((a) => a.id === articleID);

  if (!article) {
    return {
      title: "Maqola topilmadi",
      description: "Siz izlagan maqola mavjud emas.",
    };
  }

  return {
    title: article.title,
    description: article.abstract.slice(0, 160),
    keywords: article.keywords.join(", "),
    openGraph: {
      title: article.title,
      description: article.abstract,
    },
  };
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
