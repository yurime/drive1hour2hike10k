
import { getAllPosts } from "@/lib/api";

export async function fetchFilteredPosts(
  query: string,
  currentPage: number,
) {
 const allPosts = getAllPosts();

      console.log(`Searching... ${query}`);
      return allPosts
    // find posts with travel distance less than requested
    .filter(  (post1) => ((post1.author.name.includes(query))
    					||(post1.content.includes(query))
    					||(post1.title.includes(query))
    					||(post1.excerpt.includes(query))
                        )
            )

  // try {
  //   const invoices = await sql<InvoicesTable>`
  //     SELECT
  //       invoices.id,
  //       invoices.amount,
  //       invoices.date,
  //       invoices.status,
  //       customers.name,
  //       customers.email,
  //       customers.image_url
  //     FROM invoices
  //     JOIN customers ON invoices.customer_id = customers.id
  //     WHERE
  //       customers.name ILIKE ${`%${query}%`} OR
  //       customers.email ILIKE ${`%${query}%`} OR
  //       invoices.amount::text ILIKE ${`%${query}%`} OR
  //       invoices.date::text ILIKE ${`%${query}%`} OR
  //       invoices.status ILIKE ${`%${query}%`}
  //     ORDER BY invoices.date DESC
  //     LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  //   `;

  //   return invoices.rows;
  // } catch (error) {
  //   console.error('Database Error:', error);
  //   throw new Error('Failed to fetch invoices.');
  // }
}