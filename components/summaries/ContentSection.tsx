import React from "react";
import { MotionDiv } from "../common/motion-wrapper";
import { containerVariannts, itemVariants } from "@/app/constants";

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
  const cleanContent = content.replace(/^[.]\s*/, "").trim();
  const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
  if (!matches) return null;
  const [_, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}

const EmojiPoint = ({ point, index }: { index: number; point: string }) => {
  const { emoji, text } = parseEmojiPoint(point) ?? {};
  return (
    <MotionDiv
      variants={itemVariants}
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
        <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>

        <p
          className="text-lg lg:text-xl
text-muted-foreground/90 leading-relaxed"
        >
          {text}
        </p>
      </div>
    </MotionDiv>
  );
};

const RegularPoint = ({ point, index }: { index: number; point: string }) => {
  return (
    <MotionDiv
      variants={itemVariants}
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
        <p
          className="text-lg lg:text-xl
        text-muted-foreground/90 leading-relaxed"
        >
          {point}
        </p>
      </div>
    </MotionDiv>
  );
};

const ContentSection = ({ title, points }: Props) => {
  return (
    <MotionDiv
      variants={containerVariannts}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5 }}
      key={points.join("")}
      className="space-y-4"
    >
      {points.map((point, index) => {
        const { isNumbered, isMainPoint, hasEmoji, isEmpty } =
          parsePoint(point);

        if (isEmpty) return null;

        if (hasEmoji && isMainPoint) {
          return (
            <EmojiPoint key={`point-${index}`} index={index} point={point} />
          );
        }
        return (
          <RegularPoint key={`point-${index}`} index={index} point={point} />
        );
      })}
    </MotionDiv>
  );
};

export default ContentSection;
