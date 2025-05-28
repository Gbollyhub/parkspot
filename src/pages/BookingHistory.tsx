import { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Calendar, Clock, MapPin, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { parkingSpots } from '@/mock/parkingData';
import SimpleNavBar from '@/components/SimpleNavBar';

const BookingHistory = () => {
  const { bookings, clearBookings, removeBooking } = useBooking();
  const [selectedBookingIndex, setSelectedBookingIndex] = useState<number | null>(null);

  const handleClearAllBookings = () => {
    if (confirm('Are you sure you want to clear all bookings?')) {
      clearBookings();
    }
  };

  const handleRemoveBooking = (index: number) => {
    removeBooking(index);
  };

  const handleSelectBooking = (index: number) => {
    setSelectedBookingIndex(index === selectedBookingIndex ? null : index);
  };

  // Find the corresponding parking spot details for a booking
  const getParkingSpotDetails = (spotId: string) => {
    return parkingSpots.find(spot => spot.id === spotId);
  };

  return (
    <>
      <SimpleNavBar />
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Bookings</h1>
          {bookings.length > 0 && (
            <Button variant="outline" onClick={handleClearAllBookings}>
              Clear All
            </Button>
          )}
        </div>

        {bookings.length === 0 ? (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>No bookings yet</AlertTitle>
            <AlertDescription>
              You haven't made any parking bookings. Return to the home page to book a parking spot.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking, index) => {
              const spotDetails = getParkingSpotDetails(booking.spotId);
              return (
                <Card 
                  key={index} 
                  className={`overflow-hidden ${
                    selectedBookingIndex === index ? 'ring-2 ring-primary' : ''
                  } transition-all hover:shadow-md cursor-pointer`}
                  onClick={() => handleSelectBooking(index)}
                >
                  <div className="relative">
                    <img
                      src={spotDetails?.image || "/placeholder.svg"}
                      alt={spotDetails?.name || "Parking spot"}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveBooking(index);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardHeader>
                    <CardTitle>{spotDetails?.name || booking.spotName || "Unknown location"}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {spotDetails?.address || booking.spotLocation || "Address unavailable"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{format(new Date(booking.date), 'PPP')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {booking.hours} hour{booking.hours !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="text-sm text-muted-foreground">
                      Booked on {format(new Date(booking.timestamp), 'MMM d, yyyy')}
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default BookingHistory;
