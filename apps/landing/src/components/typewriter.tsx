import { cn } from '@bxn/helpers/tailwind'
import { useEffect, useRef, useState } from 'react'

export function Typewriter({ entries, className }: { entries: string[]; className?: string }) {
	const [txt, setTxt] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)
	const [isWriting, setIsWriting] = useState(true)
	const finalSentenceIndex = entries.length - 1
	const sentenceIndex = useRef(0)
	const timeoutIDRef = useRef<NodeJS.Timeout | null>(null)
	const typeElementRef = useRef<HTMLHeadingElement>(null)

	const styles = cn('h-with-caret', className, {
		'with-caret': isWriting
	})

	useEffect(() => {
		if (!typeElementRef) return
		if (!isWriting) return

		const fullSentence = entries[sentenceIndex.current]

		let delta = 200 - Math.random() * 100
		if (isDeleting) delta /= 2

		if (!isDeleting && txt === fullSentence) {
			sentenceIndex.current === finalSentenceIndex ? setIsWriting(false) : setIsDeleting(true)
		} else if (isDeleting && txt === '') {
			sentenceIndex.current++
			delta = 500
			setIsDeleting(false)
		}

		timeoutIDRef.current = setTimeout(() => {
			const newTxt = isDeleting
				? fullSentence.substring(0, txt.length - 1)
				: fullSentence.substring(0, txt.length + 1)

			setTxt(newTxt)
		}, delta)

		return () => {
			if (!timeoutIDRef.current) return
			clearTimeout(timeoutIDRef.current)
		}
	}, [txt, isDeleting, isWriting, entries, finalSentenceIndex])

	return (
		<h2 className={styles} ref={typeElementRef}>
			{txt}
		</h2>
	)
}
