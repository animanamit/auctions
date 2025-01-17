import EditItemForm from "@/components/edit-item-form";

interface EditItemPageProps {
  params: { id: string };
}

export default function EditItemPage({ params }: EditItemPageProps) {
  return <EditItemForm itemId={params.id} />;
}
