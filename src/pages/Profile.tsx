import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import SimpleNavBar from "@/components/SimpleNavBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { CalendarRange, CreditCard, Globe, MapPin, Star, User } from "lucide-react";

const Profile = () => {
  // Mock user profile data with state management
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+44 (734) 123-4567",
    joinDate: "May 2023",
    profileImage: "https://github.com/shadcn.png",
    city: "London",
    state: "UK",
    bio: "",
    bookingsCount: 12,
    reviewsCount: 8,
    averageRating: 4.8,
    favoriteLocations: [
      { id: 1, name: "Westminster", address: "13 page St, Westminster, London, UK" },
      { id: 2, name: "Hackney", address: "56 Well Rd, Hackney, London, UK" }
    ],
    paymentMethods: [
      { id: 1, type: "Visa", last4: "4242", default: true },
      { id: 2, type: "Mastercard", last4: "8888", default: false }
    ]
  });

  // Payment method state
  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Update user state with form values
    setUser(prevUser => ({
      ...prevUser,
      name: formData.get('name') as string || prevUser.name,
      email: formData.get('email') as string || prevUser.email,
      phone: formData.get('phone') as string || prevUser.phone,
      city: formData.get('city') as string || prevUser.city,
      state: formData.get('state') as string || prevUser.state,
      bio: formData.get('bio') as string || prevUser.bio
    }));
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
  };

  // Function to add a new payment method
  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate last 4 digits from card number
    const last4 = newPaymentMethod.cardNumber.slice(-4);
    
    // Determine card type (simple logic for demo)
    const cardType = newPaymentMethod.cardNumber.startsWith('4') ? 'Visa' : 
                    newPaymentMethod.cardNumber.startsWith('5') ? 'Mastercard' : 
                    'Card';
    
    // Add new payment method
    const newMethod = {
      id: user.paymentMethods.length + 1,
      type: cardType,
      last4,
      default: user.paymentMethods.length === 0 // Make default if it's the first card
    };
    
    setUser(prevUser => ({
      ...prevUser,
      paymentMethods: [...prevUser.paymentMethods, newMethod]
    }));
    
    // Reset form
    setNewPaymentMethod({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: ""
    });
    
    setShowAddPaymentForm(false);
    
    toast({
      title: "Payment Method Added",
      description: `Your ${cardType} ending in ${last4} has been added successfully.`
    });
  };

  // Function to make a payment method default
  const makeDefaultPaymentMethod = (id: number) => {
    setUser(prevUser => ({
      ...prevUser,
      paymentMethods: prevUser.paymentMethods.map(method => ({
        ...method,
        default: method.id === id
      }))
    }));
    
    toast({
      title: "Default Payment Updated",
      description: "Your default payment method has been updated."
    });
  };

  // Function to delete a payment method
  const deletePaymentMethod = (id: number) => {
    setUser(prevUser => ({
      ...prevUser,
      paymentMethods: prevUser.paymentMethods.filter(method => method.id !== id)
    }));
    
    toast({
      title: "Payment Method Removed",
      description: "Your payment method has been removed."
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SimpleNavBar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile sidebar */}
            <div className="w-full md:w-1/3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.profileImage} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
                    <p className="text-muted-foreground">Member since {user.joinDate}</p>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{user.city}, {user.state}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 w-full mt-6 text-center">
                      <div>
                        <p className="font-medium">{user.bookingsCount}</p>
                        <p className="text-xs text-muted-foreground">Bookings</p>
                      </div>
                      <div>
                        <p className="font-medium">{user.reviewsCount}</p>
                        <p className="text-xs text-muted-foreground">Reviews</p>
                      </div>
                      <div>
                        <div className="flex items-center justify-center">
                          <p className="font-medium">{user.averageRating}</p>
                          <Star className="h-3 w-3 text-yellow-500 ml-1" />
                        </div>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 w-full">
                      <h3 className="text-sm font-medium mb-2 text-left">Favorite Locations</h3>
                      <div className="space-y-2">
                        {user.favoriteLocations.map(location => (
                          <div key={location.id} className="text-left border-l-2 border-primary pl-3 py-1">
                            <p className="text-sm font-medium">{location.name}</p>
                            <p className="text-xs text-muted-foreground">{location.address}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Profile content */}
            <div className="w-full md:w-2/3">
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>
                        Update your account details and personal information.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form id="profile-form" onSubmit={handleUpdateProfile}>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" defaultValue={user.name} />
                          </div>
                          
                          <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" defaultValue={user.email} />
                          </div>
                          
                          <div className="grid gap-3">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" defaultValue={user.phone} />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="city">City</Label>
                              <Input id="city" name="city" defaultValue={user.city} />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="state">State</Label>
                              <Input id="state" name="state" defaultValue={user.state} />
                            </div>
                          </div>
                          
                          <div className="grid gap-3">
                            <Label htmlFor="bio">Bio</Label>
                            <textarea 
                              id="bio"
                              name="bio"
                              className="min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                              placeholder="Tell us a bit about yourself..."
                              defaultValue={user.bio}
                            ></textarea>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <Button type="submit">Update Profile</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="payment">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>
                        Manage your payment options and preferences.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {user.paymentMethods.map(method => (
                          <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <CreditCard className="h-8 w-8 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{method.type} •••• {method.last4}</p>
                                {method.default && <Badge variant="outline">Default</Badge>}
                              </div>
                            </div>
                            <div className="space-x-2">
                              {!method.default && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => makeDefaultPaymentMethod(method.id)}
                                >
                                  Make Default
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => deletePaymentMethod(method.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        {showAddPaymentForm ? (
                          <Card className="mt-4">
                            <CardHeader>
                              <CardTitle>Add New Payment Method</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <form onSubmit={handleAddPaymentMethod} className="space-y-4">
                                <div className="space-y-2">
                                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                                  <Input 
                                    id="cardholderName" 
                                    value={newPaymentMethod.cardholderName}
                                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardholderName: e.target.value})}
                                    required
                                  />
                                </div>
                                
                                <div className="space-y-2">
                                  <Label htmlFor="cardNumber">Card Number</Label>
                                  <Input 
                                    id="cardNumber" 
                                    value={newPaymentMethod.cardNumber}
                                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardNumber: e.target.value})}
                                    placeholder="4242 4242 4242 4242"
                                    required
                                  />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="expiryDate">Expiry Date</Label>
                                    <Input 
                                      id="expiryDate" 
                                      value={newPaymentMethod.expiryDate}
                                      onChange={(e) => setNewPaymentMethod({...newPaymentMethod, expiryDate: e.target.value})}
                                      placeholder="MM/YY"
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input 
                                      id="cvv" 
                                      value={newPaymentMethod.cvv}
                                      onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cvv: e.target.value})}
                                      placeholder="123"
                                      required
                                    />
                                  </div>
                                </div>
                                
                                <div className="flex justify-end space-x-2 pt-2">
                                  <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => setShowAddPaymentForm(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button type="submit">Add Card</Button>
                                </div>
                              </form>
                            </CardContent>
                          </Card>
                        ) : (
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={() => setShowAddPaymentForm(true)}
                          >
                            Add New Payment Method
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferences</CardTitle>
                      <CardDescription>
                        Manage your app preferences and notification settings.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Notification Preferences */}
                        <div>
                          <h3 className="text-lg font-medium mb-2">Notification Settings</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="booking-notifications">Booking Confirmations</Label>
                              <input 
                                type="checkbox" 
                                id="booking-notifications"
                                defaultChecked
                                className="toggle"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="reminder-notifications">Booking Reminders</Label>
                              <input 
                                type="checkbox" 
                                id="reminder-notifications"
                                defaultChecked
                                className="toggle"
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="marketing-notifications">Marketing Updates</Label>
                              <input 
                                type="checkbox" 
                                id="marketing-notifications"
                                className="toggle"
                              />
                            </div>
                          </div>
                        </div>
                        
                        {/* Display Preferences */}
                        <div>
                          <h3 className="text-lg font-medium mb-2">Display Preferences</h3>
                          <div className="space-y-3">
                            <div className="grid gap-2">
                              <Label htmlFor="language">Language</Label>
                              <select id="language" className="rounded-md border border-input bg-background px-3 py-2">
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                              </select>
                            </div>
                            
                            <div className="grid gap-2">
                              <Label htmlFor="distance-unit">Distance Unit</Label>
                              <select id="distance-unit" className="rounded-md border border-input bg-background px-3 py-2">
                                <option value="mi">Miles</option>
                                <option value="km">Kilometers</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button onClick={() => toast({ title: "Preferences Saved", description: "Your preferences have been updated successfully." })}>
                          Save Preferences
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Toaster />
    </div>
  );
};

export default Profile;
