import Category from './category';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return <Category id={id} />;
}
