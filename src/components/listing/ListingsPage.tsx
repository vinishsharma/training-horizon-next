"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSideBar";
import ListingCard from "./ListingCard";

interface Listing {
  _id:string;
  category: string;
  title: string;
  priceMode: string;
  price: string;
  mode: string;
  location: string;
  quantity: string;
  classSize: string;
  startDate: string;
  endDate: string;
  days: string;
  gender: string;
  startTime: string;
  endTime: string;
  ageGroup: string;
  description: string;
  trainerId: string;
}

const ListingsPage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  const [keywords, setKeywords] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>(listings);

  useEffect(() => {
    fetch("http://localhost:3005/api/v1/listing/listing/")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSearch = () => {
    const filtered = listings.filter((listing) => {
      const matchesKeywords =
        keywords === "" ||
        listing.title.toLowerCase().includes(keywords.toLowerCase());
      // const matchesLocation = location === '' || listing.location.toLowerCase().includes(location.toLowerCase());
      // return matchesKeywords && matchesLocation;
      return matchesKeywords;
    });

    setFilteredListings(filtered);
  };

  const handleFilter = () => {
    const filtered = listings.filter((listing) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(listing.category);
      return matchesCategory;
    });

    setFilteredListings(filtered);
  };
  // console.log(listings[0].trainerId);

  return (
    <>
      <div>{/* <h1>{listings[0].trainerId}</h1> */}</div>
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow">
          <div className="container mx-auto">
            <SearchBar
              keywords={keywords}
              setKeywords={setKeywords}
              // location={location}
              // setLocation={setLocation}
              onSearch={handleSearch}
            />
          </div>
        </header>

        <div className="container mx-auto flex flex-1">
          <aside className="w-1/4">
            <FilterSidebar
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              onFilter={handleFilter}
            />
          </aside>

          <main className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* {filteredListings} */}
          {listings.length > 0 ? (
            listings.map((listing,idx) => (
              <ListingCard 
                listingId={listing._id} // Make sure listing._id is passed here
                category={listing.category}
                title={listing.title}
                priceMode={listing.priceMode}
                price={listing.price}
                mode={listing.mode}
                location={listing.location} trainerId={listing.trainerId} quantity={''} classSize={''} startDate={''} endDate={''} days={''} gender={''} startTime={''} endTime={''} ageGroup={''} description={''} isFavorite={false}/>
            ))
          ) : (
            <p>No listings found.</p>
          )}
        </main>
        </div>
      </div>
    </>
  );
};

export default ListingsPage;
