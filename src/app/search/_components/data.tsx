
import { getAllPosts } from "@/lib/api";

export async function fetchFilteredPosts(
  query: string,
  max_len : number,
  min_len : number,
  currentPage: number,
 
) {
 const allPosts = getAllPosts();

      // console.log(`Searching... ${query}`);
      // console.log(`min_len... ${min_len}`);
      // console.log(`max_len... ${max_len}`);
      return allPosts 
                .filter(  (post1) => ((post1.author.name.includes(query))
                					||(post1.content.includes(query))
                					||(post1.title.includes(query))
                					||(post1.excerpt.includes(query))
                                    )
                ).filter(  (post1) => ((post1.distance >= min_len) 
                                        && (post1.distance <= max_len)
                                      )
                )

 // in case will move to search in database
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