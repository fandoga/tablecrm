import React, { useState } from "react";
import styled from "styled-components";
import { Button, } from "antd";

interface Props {
    loading: boolean
    disabled: boolean
    onCreate: () => void
    onCreateAndConduct: () => void
}

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const ActionButtons: React.FC<Props> = ({
    onCreate,
    onCreateAndConduct,
    disabled,
    loading
}) => {

    return (
        <Actions>
            <Button loading={loading} type="primary" disabled={disabled} onClick={onCreate}>Создать продажу</Button>
            <Button loading={loading} type="primary" disabled={disabled} onClick={onCreateAndConduct}>Создать и провести</Button>
        </Actions>
    )
};

export default ActionButtons;
