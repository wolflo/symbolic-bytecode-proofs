requires "../../codecopier.k"

// endPC: _ => ?_ is needed, not sure why
module CODECOPIER-SPEC
    imports CODECOPIER

    rule <k> #execute => #halt </k>
        <mode> NORMAL </mode>
        <schedule> ISTANBUL </schedule>
        <memoryUsed> 0 => ?_ </memoryUsed>
        <localMem> .Map => ?_ </localMem>
        <program> codecopier_runtime ++ BS </program>
        <output> .ByteArray => BS </output>
        <statusCode> _ => EVMC_SUCCESS </statusCode>
        <jumpDests> #computeValidJumpDests(codecopier_runtime) </jumpDests>
        <pc> 0 => ?_ </pc>
        <endPC> _ => ?_ </endPC>
        <wordStack> .WordStack => ?_ </wordStack>
        <gas> VGAS => ?_ </gas>
        <callData> .ByteArray </callData>
        <caller> _ </caller>
    requires
        VGAS >Int 1000000
        andBool #sizeByteArray(BS) >Int 0 andBool #sizeByteArray(BS) <Int 100

endmodule
