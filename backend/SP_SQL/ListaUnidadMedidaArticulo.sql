
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Carlos Ubillus
-- Create date: 11/09/2023
-- Description:	Lista unidad de medida del articulo
-- =============================================
CREATE PROCEDURE [EXX_UnidadMedidaArticulo_Listar] -- [EXX_UnidadMedidaArticulo_Listar] '20010110409017'
	-- Add the parameters for the stored procedure here
	@P_CodArticulo varchar(25)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	--T1.ItemCode,
			--T1.UgpEntry,
			T3."UomEntry",
			T4."UomCode",
			T4."UomName"
	FROM OITM T1 
	INNER JOIN OUGP T2 ON T2."UgpEntry" = T1."UgpEntry" 
	INNER JOIN UGP1 T3 ON T3."UgpEntry" = T2."UgpEntry"
	INNER JOIN OUOM T4 ON T4."UomEntry" = T3."UomEntry"
	WHERE T1."ItemCode" = @P_CodArticulo
END
GO
