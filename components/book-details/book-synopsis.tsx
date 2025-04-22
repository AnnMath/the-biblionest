import formatSynopsis from '@/utils/helpers/synopsisHelper'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const BookSynopsis = ({ synopsis }: { synopsis: string | undefined }) => {
  const { main, extras } = formatSynopsis(synopsis)
  return (
    <div className="space-y-2">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-600 underline hover:text-accent-700 transition-colors"
            >
              {children}
            </a>
          ),
          p: ({ children }) => (
            <p className="first:first-letter:text-3xl first:first-letter:font-bold first:first-letter:font-heading first:first-letter:italic">
              {children}
            </p>
          ),
        }}
      >
        {main}
      </ReactMarkdown>

      {extras.length > 0 && (
        <Accordion type="single" collapsible>
          <AccordionItem value="links">
            <AccordionTrigger className="max-w-fit text-accent-600">
              Also contained in:
            </AccordionTrigger>
            {/* <p className="text-xs font-medium mb-1">Also contained in:</p> */}
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {extras.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className=" hover:text-text-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  )
}

export default BookSynopsis
