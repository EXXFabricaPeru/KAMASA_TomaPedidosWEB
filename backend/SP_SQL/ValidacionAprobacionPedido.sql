SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 25/09/2023
-- Description:	Validaciond de aprobacion de pedido
-- =============================================
CREATE PROCEDURE [EXX_ValidacionAprobaciobnPedidoVenta] 
	-- Add the parameters for the stored procedure here
	@P_CardCode varchar(12),
	@P_Importe decimal(18,4),
	@P_CondPago int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @xSolSobreGiro varchar(1)
	DECLARE @xPorcentajeSobreGiro decimal(18,4)
	DECLARE @xLineaCredito decimal(18,4)
	DECLARE @xImpFacturas decimal(18,4)
	DECLARE @xImpPedidos decimal(18,4)
	DECLARE @xSaldo decimal(18,4)
	DECLARE @xSobregiro decimal(18,4)
	DECLARE @xRpt varchar(1)

    -- Insert statements for procedure here
	SELECT	@xSolSobreGiro = ISNULL(U_EXK_SOLSOB, 'N'),
			@xPorcentajeSobreGiro = ISNULL(U_EXK_PORSOB, 0),
			@xLineaCredito = "CreditLine",
			@xImpFacturas = ABS("Balance"),
			@xImpPedidos = ABS("OrdersBal")
	FROM OCRD
	WHERE "CardCode" = @P_CardCode

	--Validar condicion de pago al contado
	IF (@P_CondPago = -1)
		SET @xRpt = 'Y'
	ELSE
	BEGIN
	-- Validar sobregiro
		SET @xSaldo = @xLineaCredito - @xImpFacturas - @xImpPedidos - @P_Importe

		IF (@xSaldo < 0)
		BEGIN
			IF (@xSolSobreGiro = 'N')
			BEGIN
				SET @xSobregiro = (ABS(@xSaldo) / @xLineaCredito) * 100
				IF (@xSobregiro > @xPorcentajeSobreGiro)
					SET @xRpt = 'Y'
				ELSE
					SET @xRpt = 'N'
			END
			ELSE
				SET @xRpt = 'N'
		END
		ELSE
			SET @xRpt = 'N'
	END
	
	SELECT @xRpt "Resultado"

END
GO
