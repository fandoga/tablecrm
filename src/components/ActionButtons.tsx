import React, { useState } from "react";
import styled from "styled-components";
import { Button, Flex, } from "antd";

interface Props {
    loading: boolean
    disabled: boolean
    onCreate: () => void
    onCreateAndConduct: () => void
}


const ActionButtons: React.FC<Props> = ({
    onCreate,
    onCreateAndConduct,
    disabled,
    loading
}) => {

    return (
        <Flex style={{ borderTop: "1px solid rgb(221, 221, 221)", background: "#ffffff", padding: "16px", position: "sticky", bottom: "0" }} gap="12px" justify="center" align="center" vertical>
            <Button
                size="large"
                style={{ width: "100%" }}
                loading={loading}
                type="primary"
                disabled={disabled}
                onClick={onCreate}>
                Создать продажу
            </Button>
            <Button
                color="purple"
                variant="solid"
                size="large"
                style={{ width: "100%" }}
                loading={loading}
                type="primary"
                disabled={disabled}
                onClick={onCreateAndConduct}>
                Создать и провести
            </Button>
        </Flex >
    )
};

export default ActionButtons;
