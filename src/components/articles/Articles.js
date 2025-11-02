import "./Articles.css";

import Link from "next/link";
import { articles } from "@/data/data";

export default function Articles() {
  return (
    <div className="articles-page">
      <h1>Maqolalar Ro‘yxati</h1>
      <div className="articles-grid">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <Link href={article.id}>{article.title}</Link>
            <p className="article-authors">
              <strong>Muallif(lar):</strong> {article.authors.join(", ")}
            </p>
            <p className="article-abstract">
              {article.abstract.length > 150
                ? article.abstract.slice(0, 150) + "..."
                : article.abstract}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
