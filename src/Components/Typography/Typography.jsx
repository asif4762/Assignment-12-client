import React from "react";

const Typography = () => {
  return (
    <div>
      <div className="collapse bg-green-50">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
        Building Overview
        </div>
        <div className="collapse-content">
          <p>Our building offers luxurious and modern apartments, equipped with the latest amenities to ensure a comfortable and convenient living experience. The architecture blends contemporary design with sustainable practices, providing a perfect home for families, professionals, and retirees alike..</p>
        </div>
      </div>
      <div className="collapse bg-green-50">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
        Q: What amenities are available in the building?
        </div>
        <div className="collapse-content">
          <p>A: The building features a state-of-the-art gym, a rooftop swimming pool, a communal lounge area, a children's playroom, and secure underground parking.</p>
        </div>
      </div>
      <div className="collapse bg-green-50">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
        Q: Is there 24/7 security in the building?
        </div>
        <div className="collapse-content">
          <p>A: Yes, the building has 24/7 security personnel and surveillance cameras to ensure the safety of all residents.</p>
        </div>
      </div>
      <div className="collapse bg-green-50">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
        Q: Are pets allowed in the building?
        </div>
        <div className="collapse-content">
          <p>A: Yes, the building is pet-friendly. We have designated pet areas and pet services available.</p>
        </div>
      </div>
      <div className="collapse bg-green-50">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
        Q: What is the policy on renovations or alterations to the apartments?
        </div>
        <div className="collapse-content">
          <p>A: Residents can make renovations or alterations to their apartments with prior approval from the management. Specific guidelines and restrictions apply to ensure the building's integrity and design consistency.</p>
        </div>
      </div>
    </div>
  );
};

export default Typography;
