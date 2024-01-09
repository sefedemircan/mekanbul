import Header from "./Header";
import VenueList from "./VenueList";
import VenueReducer from "../services/VenueReducer";
import React from "react";
import VenueDataService from "../services/VenueDataService";
import { useNavigate } from "react-router-dom";
function Admin() {
  const [venues, dispatchVenues] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    isDeleted: false,
  });
  const navigate = useNavigate();
  function handleClick(evt, id) {
    evt.preventDefault();
    const button = evt.target;
    const name = button.getAttribute('name');
    
    switch (name) {
      case "Sil":
        console.log(`Sil butonuna tıklandı - Mekan ID: ${id}`);
        VenueDataService.removeVenue(id)
          .then(() => {
            dispatchVenues({ type: "REMOVE_VENUE", payload: id });
            navigate("/admin");
          })
          .catch((error) => {
            console.error("Mekanı silerken hata oluştu:", error);
          });
          break;
          
        case "Güncelle":
          console.log(`Güncelle butonuna tıklandı - Mekan ID: ${id}`);
          navigate(`/admin/addupdate/venue/${id}`, { state: { action: "update" } });
          break;
          
        case "Mekan Ekle":
          console.log(`Mekan ekle butonuna tıklandı`);
          navigate(`/admin/addupdate/venue/new`, { state: { action: "new" } });
          break;
        default:
          console.log(`Bilinmeyen butonuna tıklandı`);
    }
  }
  React.useEffect(() => {
   
    dispatchVenues({ type: "FETCH_INIT" });

    VenueDataService.listAllVenues()
      .then((result) => {
        dispatchVenues({
          type: "FETCH_SUCCESS",
          payload: result.data,
        });
      })
      .catch((error) => {
        console.error("Mekanları getirirken hata oluştu:", error);
        dispatchVenues({ type: "FETCH_FAILURE" });
      });
  }, []);
  return (
    <>
      <Header headerText="Yönetici" motto="Mekanlarınızı Yönetin!" />
      {venues.isError ? (
        <p>
          <strong>Birşeyler ters gitti! ...</strong>
        </p>
      ) : venues.isLoading ? (
        <p>
          <strong>Mekanlar Yükleniyor ...</strong>
        </p>
      ) : (
        venues.isSuccess && (
          <div className="row">
            <VenueList
              venues={venues.data}
              admin={true}
              onClick={handleClick}
            />
          </div>
        )
      )}
    </>
  );
}

export default Admin;
