import ToolDetailClient from "./ToolDetailClient";

export default async function ProductDetail(props: { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;

  return (
    <ToolDetailClient 
      slug={id} 
      searchParams={searchParams}
    />
  );
}