-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 25/09/2023
-- Description:	Validaciond de aprobacion de pedido
-- =============================================
CREATE PROCEDURE "EXX_TPED_ValidacionAprobaciobnPedidoVenta"
(
	IN P_CardCode varchar(12),
	IN P_Importe decimal(18,4),
	IN P_CondPago int
)
AS
BEGIN
	DECLARE xSolSobreGiro varchar(1);
	DECLARE xPorcentajeSobreGiro decimal(18,4);
	DECLARE xLineaCredito decimal(18,4);
	DECLARE xImpFacturas decimal(18,4);
	DECLARE xImpPedidos decimal(18,4);
	DECLARE xSaldo decimal(18,4) = 0;
	DECLARE xSobregiro decimal(18,4);
	DECLARE xRpt varchar(1) = '';

    -- Insert statements for procedure here
	SELECT	IFNULL(U_EXK_SOLSOB, 'N'),
			IFNULL(U_EXK_PORSOB, 0),
			"CreditLine",
			ABS("Balance"),
			ABS("OrdersBal")
		INTO xSolSobreGiro, xPorcentajeSobreGiro, xLineaCredito, xImpFacturas, xImpPedidos
	FROM OCRD
	WHERE "CardCode" = :P_CardCode;

	--Validar condicion de pago al contado
	IF (:P_CondPago = -1) THEN
		SET :xRpt = 'Y';
	ELSE
	-- Validar sobregiro
		SET :xSaldo = :xLineaCredito - :xImpFacturas - :xImpPedidos - :P_Importe;

		IF (:xSaldo < 0) THEN
			IF (:xSolSobreGiro = 'N') THEN
				SET :xSobregiro = (ABS(:xSaldo) / :xLineaCredito) * 100;
				IF (:xSobregiro > :xPorcentajeSobreGiro) THEN
					SET :xRpt = 'Y';
				ELSE
					SET :xRpt = 'N';
				END IF;
			ELSE
				SET :xRpt = 'N';
			END IF;
		ELSE
			SET :xRpt = 'N';
		END IF;
	END IF;
	
	SELECT :xRpt AS "Resultado" FROM DUMMY;

END
