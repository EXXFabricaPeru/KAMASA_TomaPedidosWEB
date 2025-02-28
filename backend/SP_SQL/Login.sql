SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Login - Toma Pedido
-- =============================================
ALTER PROCEDURE [EXX_LoginTomaPedido]
	-- Add the parameters for the stored procedure here
	@P_User varchar(15),
	@P_Pass varchar(150)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	"U_EXX_USER" "Usuario",
			'' "Nombre",
			"U_EXX_VENDEDOR" "CodVendedor"
	FROM "@EXX_USERPED"
	WHERE "U_EXX_USER" = @P_User
	  AND "U_EXX_PASS" = @P_Pass
END
GO
