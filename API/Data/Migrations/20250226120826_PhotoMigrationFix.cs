using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class PhotoMigrationFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProfilePictures_Users_AppUserId",
                table: "ProfilePictures");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProfilePictures",
                table: "ProfilePictures");

            migrationBuilder.RenameTable(
                name: "ProfilePictures",
                newName: "ProfilePicture");

            migrationBuilder.RenameIndex(
                name: "IX_ProfilePictures_AppUserId",
                table: "ProfilePicture",
                newName: "IX_ProfilePicture_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProfilePicture",
                table: "ProfilePicture",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProfilePicture_Users_AppUserId",
                table: "ProfilePicture",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProfilePicture_Users_AppUserId",
                table: "ProfilePicture");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProfilePicture",
                table: "ProfilePicture");

            migrationBuilder.RenameTable(
                name: "ProfilePicture",
                newName: "ProfilePictures");

            migrationBuilder.RenameIndex(
                name: "IX_ProfilePicture_AppUserId",
                table: "ProfilePictures",
                newName: "IX_ProfilePictures_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProfilePictures",
                table: "ProfilePictures",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProfilePictures_Users_AppUserId",
                table: "ProfilePictures",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
