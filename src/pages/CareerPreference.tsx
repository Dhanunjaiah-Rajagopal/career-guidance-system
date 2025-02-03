import CareerPreferenceForm from "@/components/CareerPreferenceForm"

function CareerPreference() {
  return (
    <div className=" items-center justify-center  bg-[color:var(--background)] text-[color:var(--foreground)]">
  <div className="p-10 bg-[color:var(--card)] text-[color:var(--card-foreground)] rounded-lg shadow-md space-y-4">
    <CareerPreferenceForm />
  </div>
</div>

  )
}

export default CareerPreference