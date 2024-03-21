type Props = {
  title: string;
  slug?: string;
  content: string;
};

export async function handler({ title, slug, content }: Props) {
  console.log(title, content, slug);

  return {
    statusCode: 200,
  };
}
