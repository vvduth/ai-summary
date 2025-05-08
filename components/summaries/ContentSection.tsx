import React from "react";

interface Props {
  title: string;
  points: string[];
}

function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^/.test(point);
  const emojiRegex = /[\u{1F300}-\u{1F9FF}] | [\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();
  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

function parseEmojiPoint(content: string) {
    const cleanContent = content.replace(/^[.]\s*/, '').trim();
    const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
    if (!matches) return null;
    const [_, emoji, text] = matches;
    return {
    emoji: emoji.trim(),
    text: text.trim(),
    };
}

const EmojiPoint = ({ point, index }: { index: number,point: string }) => {
    const {emoji, text} = parseEmojiPoint(point) ?? {};
    return (
        <div
        key={`point-${index}`}
        className={`group relative bg-linear-to-br
          from-gray-200/[0.08]
          to-gray-400/[0.03] p-4
          rounded-2xl border ☐ border-gray-500/10
          hover:shadow-lg transition-all`}
      >
        <div
          className={`absolute inset-0 bg-linear-to-r
        from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity
        rounded-2xl`}
        />

        <div className="relative flex items-start gap-3">
          <span
            className="text-lg lg:text-xl shrink-0 pt-1"
          >
            {emoji}
          </span>

          <p
            className="text-lg lg:text-xl
text-muted-foreground/90 leading-relaxed"
          >
            {text}
          </p>
        </div>
      </div>
      );
}

const ContentSection = ({ title, points }: Props) => {
  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const { isNumbered, isMainPoint, hasEmoji, isEmpty } =
          parsePoint(point);
        
        if (hasEmoji || isMainPoint) {
          return(
            <EmojiPoint index={index} point={point} />
          )
        }
        return (
          <EmojiPoint index={index}   point={point} />
        );
      })}
    </div>
  );
};

export default ContentSection;
