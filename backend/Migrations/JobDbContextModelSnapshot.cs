// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using jobApi.Data;

#nullable disable

namespace jobApi.Migrations
{
    [DbContext(typeof(JobDbContext))]
    partial class JobDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.7");

            modelBuilder.Entity("jobApi.Model.DetailCard", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Client_contact")
                        .HasColumnType("TEXT");

                    b.Property<string>("Client_name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Create_Time")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Notes")
                        .HasColumnType("TEXT");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("Jobs");
                });
#pragma warning restore 612, 618
        }
    }
}
