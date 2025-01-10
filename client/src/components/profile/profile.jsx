import Inventory from "./inventory/inventory";

//TODO: initial profile view
function Profile({ inventory, setInventory, getInventory }) {
  return (
    <>
      <div className="profile-container">
        <div className="welcome-text">
          <h2 className="subtitle">Welcome to barSync!</h2>
          <p>
            To the right you will see your ingredient inventory where you can
            store ingredients you already own.
          </p>
          <p>
            If you wish to add a new ingredient select the button in the bar
            above.
          </p>
          <p>Want to make something? Select the button in the bar above.</p>
        </div>
        <div className="inventory-container">
          <Inventory
            inventory={inventory}
            setInventory={setInventory}
            getInventory={getInventory}
          ></Inventory>
        </div>
      </div>
    </>
  );
}

export default Profile;
