requires "lemmas.k"

module CODECOPIER
    imports EVM-ASSEMBLY
    imports LEMMAS

    syntax ByteArray ::= "codecopier_runtime"
    rule codecopier_runtime => #parseByteStack("6000601780380380156012578091833990f35b600080fd") [macro]

endmodule
