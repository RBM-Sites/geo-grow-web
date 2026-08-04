import GoogleReviews from "@/components/GoogleReviews";

interface ReviewsSectionProps {
  locationName?: string;
}

const ReviewsSection = ({ locationName }: ReviewsSectionProps) => (
  <section className="section-padding bg-muted">
    <div className="container-custom">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        {locationName ? `What Our Customers Say in ${locationName}` : "What Our Customers Say"}
      </h2>
      <GoogleReviews
        placeId="ChIJPfLBoqXryIARmjA2Wqe32RY"
        apiBase="https://pgnqlvedsdgabcnkjqym.supabase.co/functions/v1/reviews-proxy"
        layout="carousel"
        theme="light"
        accent="#02365A"
        minRating={4}
        maxReviews={5}
      />
    </div>
  </section>
);

export default ReviewsSection;
