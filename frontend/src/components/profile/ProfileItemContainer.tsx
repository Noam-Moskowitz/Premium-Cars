import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ProfileItemContainer = () => {
  const [editable, setEditable] = useState(false);
  const [fieldData, setFieldData] = useState<any>(`johnny`);

  return (
    <div>
      <Label>aaaa</Label>
      {editable ? (
        <Input value={fieldData} onChange={(e) => setFieldData(e.target.value)} />
      ) : (
        <div className="p-2 px-4 bg-accent rounded shadow-inner">{fieldData}</div>
      )}
      <Button variant="outline" onClick={() => setEditable(!editable)} className="bg-info">
        edit
      </Button>
    </div>
  );
};

export default ProfileItemContainer;
